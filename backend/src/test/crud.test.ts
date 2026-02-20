import axios from 'axios'

const API = 'http://localhost:3000/tasks'

async function runTests() {
  try {
    console.log('--- Criando tarefa... ---')
    const createResp = await axios.post(API, { title: 'Minha primeira tarefa' })
    console.log('Criada:', createResp.data)
    const taskId = createResp.data.id

    console.log('\n--- Listando tarefas... ---')
    const listResp = await axios.get(API)
    console.log(listResp.data)

    console.log('\n--- Atualizando tarefa... ---')
    const updateResp = await axios.put(`${API}/${taskId}`, { title: 'Tarefa atualizada', completed: true })
    console.log('Atualizada:', updateResp.data)

    console.log('\n--- Deletando tarefa... ---')
    await axios.delete(`${API}/${taskId}`)
    console.log('Tarefa deletada')

    console.log('\n--- Teste finalizado! ---')
    const finalList = await axios.get(API)
    console.log(finalList.data)
  } catch (error: any) {
    console.error('Erro durante os testes:', error.response?.data || error.message)
  }
}

runTests()