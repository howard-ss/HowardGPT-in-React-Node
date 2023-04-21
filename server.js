const PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

// do NOT deploy this API key or upload onto GitHub
const API_KEY = ""       //need GPT-4 API key token

app.post('/completions', async(req, res)=>{
    const options = {
         method: "POST",
         headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: req.body.message}],
            max_tokens: 100, 
         })

    }

    try {
       const response = await fetch ('https://api.openai.com/v1/chat/completions', options) 
       const data = await response.json()
       res.send(data)
    }catch(error) {
        console.error(error)
    }
} )

app.listen(PORT, () => console.log('Your sever is running on PORT ' + PORT));
