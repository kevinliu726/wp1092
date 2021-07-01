const Subscription = {
    subscribeLobby: {
        subscribe(parent, args, context, info){
            const {roomType} = args;
            const {pubSub} = context;
            return pubSub.asyncIterator(roomType);
        }
    },
    subscribeRoom: {
        subscribe(parent, {roomID}, {pubSub}, info){
            return pubSub.asyncIterator(`room_${roomID}`);
        }
    }
}

export default Subscription;