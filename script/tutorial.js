let i = 1;
let isExecuting = false;

unityButtons.forEach(function (el, i){
    el.addEventListener('click', async function () {
        if (isExecuting) {
            return;
        }
        isExecuting = true;

        try {
            await dispatch('tut' + i, this);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            isExecuting = false;
        }
    });
    i++;
})
