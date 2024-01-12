import logging
import azure.functions as func
from shared.app import engage_logic
import json
import asyncio

def run_async_function(func_to_run, *args):
    new_loop = asyncio.new_event_loop()
    try:
        asyncio.set_event_loop(new_loop)
        return new_loop.run_until_complete(func_to_run(*args))
    finally:
        new_loop.close()

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    try:
        request_data = req.get_json()
        user_input = request_data['user_input']
    except ValueError:
        return func.HttpResponse("Invalid JSON input", status_code=400)

    # Using the run_async_function to execute the engage_logic function
    answer_text = run_async_function(engage_logic, user_input)

    return func.HttpResponse(json.dumps({"response": answer_text}), status_code=200)
