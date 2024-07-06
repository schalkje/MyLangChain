python -m venv venv

# Activate the virtual environment
.\venv\Scripts\Activate

# Adding the Virtual Environment as a Kernel:
pip install ipykernel
python -m ipykernel install --user --name=venv --display-name="Python (venv)"