import Product from "../models/product.model.js";
export const generateFakeData = () => {
  const fakeProducts = [
    {
      name: "Nike Sportswear Tech Fleece",
      price: 3900,
      description: "Campera con Capucha de Moda para Hombre",
      description_long:
        "¿Estas listo para lucir la calidez y la comodidad de tu buzo con capucha ideal para el fin de semana, pero necesitas mantener un look impecable? este buzo con capucha Nike Tech Fleece logra el equilibrio perfecto con un diseño ligero y de perfil bajo que permite mantener la calidez sin agregar volumen. Puedes usarla en capas con facilidad, ya sea que estes descansando en casa o en tu traslado por la ciudad.",
      img_url:
        "https://nikearprod.vtexassets.com/arquivos/ids/378903-1200-1200?v=638138928675670000&width=1200&height=1200&aspect=true",
      img_url_descript:
        "https://nikearprod.vtexassets.com/arquivos/ids/381400-1200-1200?v=638138963706000000&width=1200&height=1200&aspect=true",
    },
    {
      name: "Nike Dri-FIT Sport Clash",
      price: 7500,
      description: "Buzo con Capucha de Entrenamiento para Hombre",
      description_long:
        "El buzo con capucha Nike Sport Clash te da la ventaja para esforzarte más que nunca. La tecnología integrada que absorbe la humedad te ayuda a mantener la transpirabilidad para que te centres en tomar el control. Está hecho con al menos 75% de material reciclado.",
      img_url:
        "https://nikearprod.vtexassets.com/arquivos/ids/439465-1200-1200?v=638145703166330000&width=1200&height=1200&aspect=true",
      img_url_descript:
        "https://nikearprod.vtexassets.com/arquivos/ids/443923-800-800?v=638145844119700000&width=800&height=800&aspect=true",
    },
    {
      name: "Parka Nike Sportswear Therma-FIT Repel",
      price: 10000,
      description: "Campera de Moda para Mujer",
      description_long:
        "Nike Sportswear Therma -FIT Jacket actualiza una capa favorita de Nike. Su tejido resistente a la intemperie Repel y su aislamiento están hechos con poliéster reciclado derivado de botellas de plástico. Un diseño de capucha de buceo y un ajuste fácil de capas lo convierten en un elemento básico para el clima frío. Este producto está fabricado con al menos un 50 % de fibras de poliéster recicladas.",
      img_url:
        "https://nikearprod.vtexassets.com/arquivos/ids/679708-1200-1200?v=638224394972770000&width=1200&height=1200&aspect=true",
      img_url_descript:
        "https://nikearprod.vtexassets.com/arquivos/ids/679709-1200-1200?v=638224395151470000&width=1200&height=1200&aspect=true",
    },
    {
      name: "Nike Pro DriFIT",
      price: 2500,
      description: "Remera Manga Larga de Entrenamiento para Hombre",
      description_long:
        "El Nike Aqua Rift, que combina características de dos influencias de estilo clásicos de los 90, trae el estilo retro de playa al presente con un estilo futurista y una postura exagerada. Con la icónica punta dividido de Nike Air Rift, tiene un diseño único en las calles. Las increíbles formas y los colores de los dibujos animados de la línea Nike Aqua ponen la parte superior en un tiempo y un lugar únicos.",
      img_url:
        "https://nikearprod.vtexassets.com/arquivos/ids/647859-1200-1200?v=638212457942670000&width=1200&height=1200&aspect=true",
      img_url_descript:
        "https://nikearprod.vtexassets.com/arquivos/ids/649390-1200-1200?v=638213051647800000&width=1200&height=1200&aspect=true",
    },
    {
      name: "Jordan 23 Engineered",
      price: 5500,
      description: "Buzo con Capucha Jordan para Hombre",
      description_long:
        "Con este buzo sin cierre holgado de 23 Engineered hemos pasado al siguiente nivel de los buzos con capucha. Confeccionada con tejido Fleece suave, mantiene la calidez y aporta un look llamativo.",
      img_url:
        "https://nikearprod.vtexassets.com/arquivos/ids/532788-1200-1200?v=638161398475700000&width=1200&height=1200&aspect=true",
      img_url_descript:
        "https://nikearprod.vtexassets.com/arquivos/ids/538902-1200-1200?v=638161512046030000&width=1200&height=1200&aspect=true",
    },
    {
      name: "Jordan Essential",
      price: 5500,
      description: "Pantalón Jordan para Hombre",
      description_long:
        "Estos joggins aportan la versatilidad que necesitas para todos los días. Confeccionados con tejido Fleece de French Terry suavemente cepillado, cuentan con un ajuste holgado y cómodo, y una pretina ajustable y segura. Desde el supermercado hasta el partido informal, todo está listo con estos joggins imprescindibles.",
      img_url:
        "https://nikearprod.vtexassets.com/arquivos/ids/211106-1200-1200?v=638098214833470000&width=1200&height=1200&aspect=true",
      img_url_descript:
        "https://nikearprod.vtexassets.com/arquivos/ids/215596-1200-1200?v=638098349025300000&width=1200&height=1200&aspect=true",
    },
    {
      name: "Nike Dri-FIT Swoosh",
      price: 3800,
      description: "Remera Manga Larga de Running para Mujer",
      description_long:
        "Suma más kilómetros a tu rutina de running con esta prenda intermedia. Ofrece una sensación de suavidad con un diseño de cierre de 1/4 para que puedas controlar el flujo de aire. Los orificios para el pulgar en las mangas te ayudan a proteger las manos cuando hace frío.",
      img_url:
        "https://nikearprod.vtexassets.com/arquivos/ids/533806-1200-1200?v=638161414909030000&width=1200&height=1200&aspect=true",
      img_url_descript:
        "https://nikearprod.vtexassets.com/arquivos/ids/539920-1200-1200?v=638161529767430000&width=1200&height=1200&aspect=true",
    },
    {
      name: "Nike Sportswear Icon Clash",
      price: 3500,
      description: "Buzo de Moda para Mujer",
      description_long:
        "Repensamos tu buzo con capucha para el juego y la convertimos en este buzo cropped sin cierre de ajuste holgado. Los paneles de ripstop ondulados brindan una sensación más ligera que puedes disfrutar en temperaturas más cálidas.",
      img_url:
        "https://nikearprod.vtexassets.com/arquivos/ids/212671-1200-1200?v=638098243271470000&width=1200&height=1200&aspect=true",
      img_url_descript:
        "https://nikearprod.vtexassets.com/arquivos/ids/217161-1200-1200?v=638098371104000000&width=1200&height=1200&aspect=true",
    },
    {
      name: "Nike Sportswear Team Nike",
      price: 3900,
      description: "Buzo de Moda para Mujer",
      description_long:
        "No tienes que jugar deportes en equipo para amar los uniformes. Inspirados en las letras universitarias que se usan en las camperas y los buzos con capucha, combinamos una camiseta del equipo con un buzo con capucha oversized para brindarte un look que puedas lucir en capas. El espacio en el cuerpo y las mangas te ayuda a moverte y usarla cómodamente en capas.",
      img_url:
        "https://nikearprod.vtexassets.com/arquivos/ids/211026-1200-1200?v=638098213412470000&width=1200&height=1200&aspect=true",
      img_url_descript:
        "https://nikearprod.vtexassets.com/arquivos/ids/215516-1200-1200?v=638098347933100000&width=1200&height=1200&aspect=true",
    },
    {
      name: "Nike Element",
      price: 3500,
      description: "Buzo de Running para Mujer",
      description_long:
        "Regresa la Nike Element Crew con un diseño actualizado que está hecho con materiales reciclados. Una funda completamente nueva cuenta con una ventana que le permite consultar fácilmente su reloj. Úsalo como capa intermedia, primera capa o solo. Este producto está fabricado con al menos un 75 % de fibras de poliéster recicladas.",
      img_url:
        "https://nikearprod.vtexassets.com/arquivos/ids/618804-1200-1200?v=638204446548630000&width=1200&height=1200&aspect=true",
      img_url_descript:
        "https://nikearprod.vtexassets.com/arquivos/ids/679709-1200-1200?v=638224395151470000&width=1200&height=1200&aspect=true",
    },
    {
      name: "Nike Sportswear Icon Clash",
      price: 3800,
      description: "Pantalón de Moda para Mujer",
      description_long:
        "Muévete con estilo con estos pants de entrenamiento maravillosamente suaves. El ribete a lo largo de las costuras delanteras aporta un toque vintage mientras mantiene tu look fresco.",
      img_url:
        "https://nikearprod.vtexassets.com/arquivos/ids/210960-1200-1200?v=638098212237930000&width=1200&height=1200&aspect=true",
      img_url_descript:
        "https://nikearprod.vtexassets.com/arquivos/ids/215450-1200-1200?v=638098347062830000&width=1200&height=1200&aspect=true",
    },
    {
      name: "Nike Sportswear Icon Clash",
      price: 3500,
      description: "Buzo con Capucha de Moda para Mujer",
      description_long:
        "Este buzo sin cierre, con gráficos de Nike y un patrón gráfico de jacquard floral, tiene un look retro y nostálgico inspirado en el deporte. El ajuste oversized y la confección de tejido Fleece semicepillada en la parte posterior suave la convierten en una opción sumamente agradable e informal para combinar con otras prendas cuando todo lo que quieres es comodidad.",
      img_url:
        "https://nikearprod.vtexassets.com/arquivos/ids/158671-1200-1200?v=638086322646800000&width=1200&height=1200&aspect=true",
      img_url_descript:
        "https://nikearprod.vtexassets.com/arquivos/ids/162673-1200-1200?v=638086385337900000&width=1200&height=1200&aspect=true",
    },
  ];

  Product.bulkCreate(fakeProducts)
    .then(() => {
      console.log("Datos falsos generados con éxito.");
    })
    .catch((error) => {
      console.error("Error al generar datos falsos:", error);
    });
};
