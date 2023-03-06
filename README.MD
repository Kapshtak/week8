# Cars project

This project has two parts: 
- a simple JS server with the 'database' based on the JSON file, and
- frontend part with the table containing the current 'database' entries, the form to create a new 'database' entry and the form to search for cars.

### Examples of API responses
The server provides an API with three endpoints: `/get-cars`, `/create-car` and `/find-car`. The discounted price and discount amount are automatically added by the server to the API responses from the `/get-cars` and `/find-car` endpoints. Examples of responses are given below.
- `/get-cars`:
```
[
    {
        "licence": "A555TH",
        "maker": "Lada",
        "model": "Niva",
        "owner": "Alexey",
        "price": "125000",
        "color": "Black",
        "discountedPrice": 93750,
        "discount": "25%"
    }
]
```
- `/create-car`:
```
{
    "licence": "O265PT",
    "maker": "Audi",
    "model": "TT",
    "owner": "Marina",
    "price": "1400000",
    "color": "Pink"
}
```
- `/find-car`:
```
{
    "licence": "O265PT",
    "maker": "Audi",
    "model": "TT",
    "owner": "Marina",
    "price": "140000",
    "color": "Pink",
    "discountedPrice": 105000,
    "discount": "25%"
}
```
## Technologies used

Built with: 

- HTML
- JS (e.g. http, fs modules)
- CSS

## Setup and usage

- check port 8000 - it should be available;
- run in terminal `node server.js`;
- open `index.html` with Live Server.

## Screenshot

![Screenshot of the interface](https://github.com/Kapshtak/week7-JS-features/blob/main/media/Screenshot.png)

## Authors

[Arseniiy Kapshtyk](https://github.com/Kapshtak) & [Ivan Pudin](https://github.com/ivanpudin)
