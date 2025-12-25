import {connectDB} from '@lib/mongodb';
import Room from '@models/Room';

export async function POST(request) {

    await connectDB();

    const {roomId, name} = await request.json();

    let rooom = await Room.findOne({roomId});

    if(!rooom){
        rooom = new Room({roomId, users: []});
    }

    if (rooom.users.some(u=> u.name ===name))
    {
        return Response.json({error: 'User with this name already exists in the room.'}, 
            {status: 400}
        );
    }
    rooom.users.push({name});
    await rooom.save();

    return Response.json({message: 'User added successfully.'}, {status: 200});
}