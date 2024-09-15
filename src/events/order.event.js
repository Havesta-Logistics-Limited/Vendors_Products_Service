const amqp = require("amqplib")
require("dotenv").config()

const orderCreationEvent = async ()=>{
    try{
        const queueName = 'vendor_order_creation'
        const connection = await amqp.connect(process.RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName, {durable: true});
        channel.consume(queueName, async(msg)=>{
            try{
                
            }catch(err){
    
            }finally{
    
            }
        })
    }catch(err){
        console.log('Could not start up rabbitMQ server:', err.message)
    }
 
    

    
}