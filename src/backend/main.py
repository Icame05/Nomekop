from bson import ObjectId
from fastapi import FastAPI, HTTPException

# Para poder utilizar campos con fecha
from datetime import date, datetime

# Pydantic es una librería para validar los datos.
# BaseModel sirve para definir clases para crear los modelos de datos que se van a usar en la API.
from pydantic import BaseModel

from typing import List, Optional

# Motor es una versión asíncrona de PyMongo,
# la biblioteca estándar de Python para trabajar con MongoDB.
import motor.motor_asyncio

# Para aceptar peticiones de diferentes dominios.
from fastapi.middleware.cors import CORSMiddleware


# Define el modelo de datos para un usuario utilizando Pydantic.
# Esto ayuda a FastAPI a validar los tipos de datos entrantes.
class Pokemon(BaseModel):
    id: int
    nombre: str
    tipo1: str
    tipo2: Optional[str]=None
    peso: float
    generacion: str
    entrenador: str

# Crea la instancia de la aplicación FastAPI
app = FastAPI()

# Lista de origenes permitidos.
origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Método permitidos
    allow_headers=["*"], # Cabeceras permitidas
)

# Cadena de conexión a MongoDB con autenticación
MONGODB_URL = "mongodb://admin:123@mongodb:27017/?authSource=admin"

client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URL)
db = client.nomekop

# Endpoint para listar todos los pokemons.
@app.get("/pokemons/", response_description="Lista todos los pokemons", response_model=List[Pokemon])
async def list_pokemons():
    pk = await db["pokemons"].find().to_list(1000)
    return pk

#Endpoint para crear un nuevo pokemon
@app.post("/pokemons/", response_description="Añade un nuevo pokemon", response_model=Pokemon) 
async def create_pokemon(pokemon: Pokemon):
    pokemon_dict = pokemon.dict()
    await db["pokemons"].insert_one(pokemon_dict)
    return pokemon

# Endpoint para obtener un pokemon específico por id.
@app.get("/pokemons/{id}", response_description="Obtiene un pokemon", response_model=Pokemon)
async def find_pokemon(id: int):
    pokemon = await db["pokemons"].find_one({"id": id})
    if pokemon is not None:
        return pokemon
    raise HTTPException(status_code=404, detail=f"Pokemon con id {id} no se ha encontrado.")

# Endpoint para borrar un pokemon especifico por id.
@app.delete("/pokemons/{id}", response_description="Borra un pokemon", status_code=204)
async def delete_pokemon(id: int):
    delete_result = await db["pokemons"].delete_one({"id": id})
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail=f"Pokemon con id {id} no se ha encontrado.")

# Endpoint para actualizar un pokemon especifico por id.
@app.put("/pokemons/{id}", response_description="Actualiza un pokemon por el id", status_code=204)
async def update_pokemons(id: int, pokemon: Pokemon):
    pokemon_dict = pokemon.dict()
    await db["pokemons"].update_one({"id": id}, {"$set": pokemon_dict})
    return pokemon

# Endpoint para listar los pokemons salvajes.
@app.get("/pokemons/salvajes/", response_description="Lista los pokemons salvajes", response_model=List[Pokemon])
async def list_salvajes():
    pipeline = [
        {
            "$project": {
                "id": 1,
                "nombre": 1,
                "tipo1": 1,
                "tipo2": 1,
                "peso": 1,
                "generacion": 1,
                "entrenador": 1
            }
        },
        {
            "$match": {
                "entrenador": {"$regex" : "^Salvaje$"}
            }
        }
    ]
    salvajes = await db["pokemons"].aggregate(pipeline).to_list(1000)
    return salvajes

# Endpoint para listar los pokemons no salvajes.
@app.get("/pokemons/noSalvajes/", response_description="Lista los pokemons no salvajes", response_model=List[Pokemon])
async def list_no_salvajes():
    pipeline = [
        {
            "$project": {
                "id": 1,
                "nombre": 1,
                "tipo1": 1,
                "tipo2": 1,
                "peso": 1,
                "generacion": 1,
                "entrenador": 1
            }
        },
        {
            "$match": {
                "entrenador": {"$not": {"$regex" : "^Salvaje$"}}
            }
        }
    ]
    salvajes = await db["pokemons"].aggregate(pipeline).to_list(1000)
    return salvajes