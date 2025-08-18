const useFetch =()=>
    {
    const SERVER_URL = 'https://rose-candle-co.onrender.com/api/';
    
    const useLogin = async (email, password)=>{
    
      const response = await fetch(`${SERVER_URL}/loginCustomer`, {
        credentials: "include"
      },{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
    
      if (!response.ok) {
        throw new Error('Error en la autenticación');
      }
      const data = await response.json();
      alert(data.message);
      return data;
    
    }
    
    
    return { useLogin };
    }
    
    export default useFetch;