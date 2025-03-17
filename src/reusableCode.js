import Swal from 'sweetalert2'
import axios from 'axios'
export default function notify(title , icon , text){
    Swal.fire({
        title,
        icon,text
       
      });
}
export function generateText(content = "Suggest 1 recommandations to enhance marketing.") {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "https://openrouter.ai/api/v1/chat/completions", // Correct OpenRouter endpoint
        {
          model: "gpt-3.5-turbo", // Specify your desired model
          messages: [
            //{ role: 'system', content: 'You are a helpful assistant.' },
            {
              role: "user",
              content 
            },
          ],
          max_tokens: 20,
        },
        {
          headers: {
            Authorization:
              "Bearer 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", // Replace with your actual OpenRouter API key
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        resolve(response.data.choices);
      })
      .catch((err) => reject(err));
  });
}

