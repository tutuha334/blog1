async function test() {
    user = {"test":123}
    const response = await fetch("http://localhost:8080/client_server/", {
        method:"POST",
        body: JSON.stringify(user)
    })
    let res = await response.json();
    console.log(res);
}

test();