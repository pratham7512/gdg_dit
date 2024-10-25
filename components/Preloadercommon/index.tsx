'use client';
import styles from './style.module.scss';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { slideUp } from '../Preloader/anim';

// Interface for dimensions
interface Dimension {
    width: number;
    height: number;
}

// Union type for the destination prop
type DestinationType = keyof typeof pageAnimations;

// Variants for different page transitions
const pageAnimations = {
    home: {
        opacity: { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 1, delay: 0.2 } } },
    },
    events: {
        opacity: { initial: { opacity: 0 }, animate: { opacity: 0.8, transition: { duration: 1, delay: 0.2 } } },
    },
    leaderboard: {
        opacity: { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 1, delay: 0.2 } } },
    }
};

// Main component
export default function Index({ destination, words }: { destination: DestinationType, words: string[] }): JSX.Element {
    const [index, setIndex] = useState<number>(0);
    const [dimension, setDimension] = useState<Dimension>({ width: 0, height: 0 });

    // Handle viewport dimensions
    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    // Cycle through custom words for each page
    useEffect(() => {
        if (index === words.length - 1) return;
        const timer = setTimeout(() => {
            setIndex(index + 1);
        }, index === 0 ? 1000 : 150);
        return () => clearTimeout(timer);
    }, [index, words]);

    // Define path animations for the SVG curve
    const initialPath: string = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
    const targetPath: string = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

    const curve = {
        initial: {
            d: initialPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
        },
        exit: {
            d: targetPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
        }
    };

    // Choose animations based on the destination prop
    const animations = pageAnimations[destination];

    return (
        <motion.div
            variants={slideUp}
            initial="initial"
            animate="animate"
            exit="exit"
            className={styles.introduction}
        >
            {dimension.width > 0 && (
                <>
                    <motion.p variants={animations.opacity} initial="initial" animate="animate">
                        <span></span>{words[index]}
                    </motion.p>
                    <svg>
                        <motion.path variants={curve} initial="initial" animate="animate" exit="exit"></motion.path>
                    </svg>
                </>
            )}
        </motion.div>
    );
}
