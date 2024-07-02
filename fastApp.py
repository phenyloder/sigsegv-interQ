import logging

from fastapi import Depends, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from injector import Injector
from sigsegv_interq.qa.askRoute import router
from settings.settings import Settings
from sigsegv_interq.config.logger import logger

def create_app(root_injector: Injector) -> FastAPI:
    async def bind_injector_to_request(request: Request) -> None:
        request.state.injector = root_injector

    app = FastAPI(dependencies=[Depends(bind_injector_to_request)])
    app.include_router(router)
    settings = root_injector.get(Settings)

    if settings.server.cors.enabled:
        logger.info("Setting up CORS middleware")


    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    )
    return app