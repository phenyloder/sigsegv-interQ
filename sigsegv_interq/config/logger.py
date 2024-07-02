import logging

logging.basicConfig(level=logging.INFO,
                    format="%(asctime)s - %(levelname)s : %(message)s",
                    datefmt="%m/%d/%y %I:%M:%S %p",
                    handlers=[
                        logging.StreamHandler(),
                        logging.FileHandler("tests.log", "a"),
                    ])
logger = logging.getLogger(__name__)