export default [
    {
      url: '/api/user/list',
      method: 'get',
      response: () => {
        return {
          code: 200,
          data: []
        }
      }
    }
  ]