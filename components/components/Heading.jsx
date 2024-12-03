import HyperText from "../ui/hyper-text";
import TagLine from "./Tagline";

const Heading = ({ className, title, text, tag }) => {
  return (
    <div
      className={`${className} max-w-[50rem] mx-auto mb-12 lg:mb-20 md:text-center`}
    >
      {tag && <TagLine className=" mb-4 justify-center">{tag}</TagLine>}
      {title && <HyperText className="text-lg md:text-4xl text-center font-bold text-white dark:text-white" text={title}/>}
      {text && <p className="body-2 mt-4 text-n-4">{text}</p>}
    </div>
  );
};

export default Heading;
