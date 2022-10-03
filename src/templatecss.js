function templatecss() {
    return `* {
        font-family: 'Shadows Into Light', cursive;
    }
        main {
            display: flex;
            justify-content: center;
            background-color: rgb(7, 89, 165);
        }
        
        h1 {
            color: white;
            background-color: rgb(7, 89, 165);
            padding: 2rem;
            font-size: 4rem;
            text-align: center;
            font-family: 'Rubik Dirt', cursive;
        }
        
        h2,
        h3 {
            font-size: 2rem;
            
        }
        
        ul {
            margin: 0.5rem;
        }
        
        li {
            padding: 2rem;
            border: 1px solid black;
        }
        
        .card {
            margin: 2rem;
            background-color: bisque;
        }`
    }


    



module.exports = templatecss;