const { MongoClient } = require('mongodb');

// Função para buscar dados de vendas no MongoDB
async function getSalesData() {
  const uri = 'mongodb://root:rootpassword@mongo:27017/test_hub_xp?authSource=admin'; 
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('teste_hub_xp');
    const ordersCollection = database.collection('orders'); 


    const salesData = await ordersCollection.find({}).toArray();
    return salesData;
  } finally {
    await client.close();
  }
}


function generateReport(salesData) {
  const totalSales = salesData.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = salesData.length;

  return {
    totalSales,
    totalOrders,
    averageOrderValue: totalSales / totalOrders,
  };
}


module.exports.handler = async (event) => {
  try {
    console.log('Iniciando processamento do relatório de vendas...');


    const salesData = await getSalesData();
    console.log('Dados de vendas obtidos:', salesData.length, 'pedidos');


    const report = generateReport(salesData);
    console.log('Relatório gerado:', report);

    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Relatório de vendas processado com sucesso',
        report: report,
      }),
    };
  } catch (error) {
    console.error('Erro ao processar relatório de vendas:', error);


    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Erro ao processar relatório de vendas',
        error: error.message,
      }),
    };
  }
};