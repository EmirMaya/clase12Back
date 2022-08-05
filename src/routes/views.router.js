import { Router } from "express";

const router = Router();

let products = [
    { nombre: "Zapatilla Adidas", 
    precio: "56465", 
    url: "https://assets.adidas.com/images/w_600,f_auto,q_auto/f88bdbb8f061489a9e8fadfe011d45a2_9366/Zapatillas_Forum_Low_Blanco_GV7613_01_standard.jpg" 
},
]

router.get('/', (req, res) => {
    res.render('chat', {
        hasProducts:products.length>0,
        products
    });
})

router.post('/', (req, res) => {
    const product = req.body;
    
    products.push(product);
    // console.log('log desde views' + product);
   
})



export default router;