from openai import OpenAI



def AIModel():
    client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key="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",
)

    with open("transcript.txt", "r") as file:
     transcript_text = file.read()

    messages = [
    {"role": "system", "content": "You are a helpful and frienly cooking voice assistant."},
    {"role": "user", "content": f"Here is a cooking video transcript:\n\n{transcript_text}\n\nFirstly, write down the ingredients required for the recipe alongwith their measurements. Also, write down the approximate time to prepare the recipe. Next, extract only the step-by-step cooking instructions needed to prepare the recipe. Ignore any irrelevant content such as introductions, personal stories, product promotions, filler words or background commentary. Format the recipe as a clear, numbered list of steps(at most one task per step) for someone trying to follow the recipe easily. Also, keep in mind that some tasks can be done simultaneously too. Make the procedure as close to how a real human being would do."}
]

    response = client.chat.completions.create(
  extra_body={},
  model="openai/gpt-3.5-turbo-0613",
  messages= messages,
  temperature=0.5
)
    with open("steps.txt", "w", encoding="utf-8") as f:
     f.write(response.choices[0].message.content)

    with open("steps.txt", 'r', encoding='utf-8') as file:
        lines = [line for line in file if line]

    return lines  

    

