import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { NEXT_AUTH_CONFIG } from '@/lib/auth'; // Update this path to point to your NEXT_AUTH_CONFIG

export async function GET() {
    try {
        // Retrieve session to access the token
        const session = await getServerSession(NEXT_AUTH_CONFIG);

        if (!session || !session.user.token) {
            return NextResponse.json(
                { error: 'Unauthorized: Token not found in session' },
                { status: 401 }
            );
        }

        // Use the token from the session
        const token = session.user.token;
        const response = await fetch('https://gdg-cfw.prathameshdesai679.workers.dev/coins', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`, // Include the token
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Error response:', errorBody);
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('API call error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch data' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const { redeem_code } = await req.json(); // Extract redeem_code from the request body

        // Retrieve session to access the token
        const session = await getServerSession(NEXT_AUTH_CONFIG);

        if (!session || !session.user.token) {
            return NextResponse.json(
                { error: 'Unauthorized: Token not found in session' },
                { status: 401 }
            );
        }

        // Use the token from the session
        const token = session.user.token;
        const response = await fetch('https://gdg-cfw.prathameshdesai679.workers.dev/redeem', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`, // Include the token
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ redeem_code }), // Send redeem_code in the body
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Error response:', errorBody);
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('API call error:', error);
        return NextResponse.json(
            { error: 'Failed to redeem code' },
            { status: 500 }
        );
    }
}

