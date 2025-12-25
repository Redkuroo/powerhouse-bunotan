import { connectDB } from '@lib/mongodb';
import Room from '@models/Room';

export async function POST(request) {
    try {
        await connectDB();

        const { roomId, name } = await request.json();

        if (!roomId || !name || !String(name).trim()) {
            return Response.json(
                { message: 'Room ID and name are required.' },
                { status: 400 }
            );
        }

        let room = await Room.findOne({ roomId });

        if (!room) {
            room = new Room({ roomId, users: [] });
        }

        if (room.users.some((u) => u.name === name)) {
            return Response.json(
                { message: 'User with this name already exists in the room.' },
                { status: 400 }
            );
        }

        room.users.push({ name });
        await room.save();

        return Response.json({ message: 'User added successfully.' }, { status: 200 });
    } catch (err) {
        return Response.json(
            { message: 'Failed to join room. Please try again later.' },
            { status: 500 }
        );
    }
}