module.exports.handler = async (event) => {
    try {
      const { orderId } = JSON.parse(event.body);
  
    
      await sendNotification(orderId);  
  
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Notificação enviada.",
        }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Erro ao enviar notificação.",
          error: error.message,
        }),
      };
    }
  };