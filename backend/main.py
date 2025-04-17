from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from .routes import user, auth
from .core import exception_handlers

app = FastAPI()

# Register route handlers here
app.include_router(user.router)
app.include_router(auth.router)

# Register exception handlers here
app.add_exception_handler(
    Exception, exception_handlers.general_exception_handler)
app.add_exception_handler(RequestValidationError,
                          exception_handlers.request_validation_exception_handler)
app.add_exception_handler(HTTPException,
                          exception_handlers.http_exception_handler)
