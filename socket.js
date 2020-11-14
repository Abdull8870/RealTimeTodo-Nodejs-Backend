let io;

module.exports = {
  init: httpServer => {
    io = require('socket.io')(httpServer);
    io.on('connection', socket => {



      socket.emit('test',"Welcome");

       socket.on('friendsupdates', (data) => {
         let information={
           information:data.information,
           msg:"activity"
         };
            socket.broadcast.emit(data.friend,information);
        });

        socket.on('activityUpdate', (data) => {

             let information={
               information:data.information,
               msg:"activity"
             };
             socket.broadcast.emit(data.userId,information);
         });

         socket.on('friendUpdate',(data)=>{
           let information={
             type:data.type,
             info:data.info,
             msg:"friend"
           };

           socket.broadcast.emit(data.userId,information);
         });

    });
    // return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io;
  }
};
