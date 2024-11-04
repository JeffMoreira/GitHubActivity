const https = require('https');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');


const options = {
    headers: {
        'User-Agent': 'node.js',
        'Host': 'api.github.com'
    }
};
const rl = readline.createInterface({ input, output });


rl.on('line', (answer) => {
    //Regex to handle double quotes
    command = answer.match(/"[^"]*"|\S+/g);

    switch (command[0]) {
        case 'ga':
            userName = command[1]
            const url = `https://api.github.com/users/${userName}/events`

            const req = https.get(url, options, (res) => {
                let data = '';
                
                switch (res.statusCode) {
                    case 404:
                            console.log('Erro 404')
                        break;
                
                    default:
                        res.on('data', (chunk) => {
                            data += chunk;
                        });
                        res.on('end', () => {
        
                            console.log(JSON.parse(data));
                        });
                        ;
                }

                
            });


            req.on('error', (error) => {
                console.log('Deu erro')
                //console.error(`Erro: ${error.message}`);
            });

            req.end();
            break;

        default:
            break;
    }
    console.log('')
});



