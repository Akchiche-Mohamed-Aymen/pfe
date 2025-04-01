import Swal from "sweetalert2";
import axios from "axios";
export default function notify(title, icon, text) {
  Swal.fire({
    title,
    icon,
    text,
  });
}
export function generateText(
  content = "Suggest 1 recommandations to enhance marketing."
) {
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
              content,
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


export const services = [
  {
    image : "https://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_clip,w_960,h_720,f_auto,q_auto/unsplashcom/photo-1590013100734-1e5a0d8fe3c7",
    title : "Financial Auditing",
    description : `With our financial auditing services, you can ensure your business is compliant with all regulations while identifying potential financial risks.
     Our detailed reports provide clarity and support informed decision-making.`,
     to : '/audit',
    btn : 'Audit Now'
  },
  {
    image : "https://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_clip,w_960,h_720,f_auto,q_auto/unsplashcom/photo-1677696796114-594eaafd4f6e",
    title : "Marketing Consulting",
    description : `Our marketing consulting services are tailored to help you craft strategies that enhance your brand's visibility and engagement. We analyze your market 
    position and help you reach your business objectives effectively.`,
     to : '/marketing',
    btn : 'Marketing'
  },
]

export const testimontials = [
  {
    image : "https://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_clip,w_960,h_720,f_auto,q_auto/unsplashcom/photo-1647518335974-0e18d74774b6",
    title : "Strategic Insights",
    description : `The marketing consulting we received from ClearPath has given us the insights needed to
     enhance our campaigns. Our ROI has never been better.`,
  },
  {
    image : "https://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_clip,w_960,h_720,f_auto,q_auto/unsplashcom/photo-1560472354-b33ff0c44a43",
    title : "Data-Driven Decisions",
    description : `Thanks to ClearPath's data analysis tools, we can now make informed decisions
     that drive our business forward and improve our bottom line.`,
  },
]