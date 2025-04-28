

function stockNotificationEmail(product) {
    return `
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; }
            .header { background-color: #f3f4f6; padding: 10px; text-align: center; }
            .content { padding: 20px; }
            .footer { padding: 10px; background-color: #f3f4f6; text-align: center; }
            .button {
                background-color: #172554;
                border: none;
                color: white;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1> C&S Auto Care </h1>    
        </div>
        <div class="content">
            <h1>Good News!</h1>
            <p>Hello! The item you’ve been waiting for is back in stock. Don’t miss out – shop now and secure your favorite product!</p>
            <h2>${product.name}</h2>
            <img src="${product.imgURL}" alt="${product.name}" style="width:100%;max-width:300px;">
            <p>${product.description}</p>
            <div class="button">LKR ${product.price}</div>
        </div>
        <div class="footer">
            <p>If you have any questions, reply to this email or contact our support team.</p>
            <p>Thank you for shopping with us!</p>
            <p> - C&S Auto Care - </p>
        </div>
    </body>
    </html>
    `;
}

module.exports = {
    stockNotificationEmail
};
