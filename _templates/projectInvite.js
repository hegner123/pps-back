export const projectInvite = ({ projectName, inviteMessage, link }) => {
  return `
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
    <style>
        * {
            font-family: 'Poppins', sans-serif;
            color: #dadce1;
        }

        body {
            display: grid;
            grid-template-columns: 150px repeat(12, 1fr) 150px;
            justify-content: center;
            align-items: center;
            background: #242526;
        }

        header,
        main {

            grid-column: 4/-4;
        }
    </style>
</head>

<body>
    <header>
        <h1>ProProjectStudio</h1>
    </header>
    <main>
        <h2>You have been invited to contribute to the <strong>${projectName}</strong> project.</h2>
        <p>${inviteMessage}</p>
        <a href="${link.url}">${link.text}</a>
    </main>
</body>

</html>
    `;
};
