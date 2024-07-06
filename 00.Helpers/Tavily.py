import getpass
import os

# not being used, but setting api key in secrets.ps1
# 

os.environ["TAVILY_API_KEY"] = getpass.getpass()
