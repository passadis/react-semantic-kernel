import openai
from dotenv import load_dotenv
from quart import Quart, request, jsonify
import semantic_kernel as sk
import semantic_kernel.connectors.ai.open_ai as sk_oai
import os
from quart_cors import cors, route_cors



app = Quart(__name__)
app = cors(app, allow_origin="*")
# Load environment variables
openai.api_key = os.getenv('OPENAI_API_KEY')
org_id = os.getenv('OPENAI_ORG_ID')
@app.after_request
async def after_request(response):
    response = await route_cors(response, allow_origin="*", allow_methods=["POST"])
    return response
# Setup from provided sample
system_message = """
You are a chat bot. Your name is Mosscap and
you have one goal: figure out what people need.
"""

kernel = sk.Kernel()
#kernel.add_chat_service(
#    "chat-gpt", sk_oai.OpenAIChatCompletion("gpt-3.5-turbo", openai.api_key,org_id)
#)
from semantic_kernel.connectors.ai.open_ai import AzureChatCompletion

#deployment, api_key, endpoint = sk.azure_openai_settings_from_dot_env()


deployment = os.environ.get('AZURE_OPENAI_DEPLOYMENT_NAME')
api_key = os.environ.get('AZURE_OPENAI_API_KEY')
endpoint = os.environ.get('AZURE_OPENAI_ENDPOINT')

kernel.add_chat_service("chat_completion", AzureChatCompletion(deployment, endpoint, api_key))

prompt_config = sk.PromptTemplateConfig.from_completion_parameters(
    max_tokens=6000, temperature=0.7, top_p=0.8
)
prompt_template = sk.ChatPromptTemplate(
    "{{$user_input}}", kernel.prompt_template_engine, prompt_config
)
prompt_template.add_system_message(system_message)

function_config = sk.SemanticFunctionConfig(prompt_config, prompt_template)
chat_function = kernel.register_semantic_function("ChatBot", "Chat", function_config)

# Refactored logic from the /engage route
async def engage_logic(user_input):
    # Set up context variables
    context_vars = sk.ContextVariables()
    context_vars["user_input"] = user_input

    # Optionally initialize chat_history if needed
    context_vars["chat_history"] = ""

    # Interact with Semantic Kernel
    answer = await kernel.run_async(chat_function, input_vars=context_vars)

    # Update chat_history for future interactions if needed
    context_vars["chat_history"] += f"\nUser:> {user_input}\nChatBot:> {answer}\n"

    # Convert the answer object to a string
    answer_text = str(answer)
    
    return answer_text

@app.route('/engage', methods=['POST'])
async def engage():
    data = await request.get_json()
    user_input = data['user_input']

    # Call the refactored logic function
    answer_text = await engage_logic(user_input)

    return jsonify({"response": answer_text})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
