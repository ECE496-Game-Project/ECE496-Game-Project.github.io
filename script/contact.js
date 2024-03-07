function composeEmail() {
    const sender = document.getElementById('id_sender').value;
    const subject = document.getElementById('id_subject').value;
    const messages = document.getElementById('id_messages').value;

    const receivers = ['jackchen.chen@mail.utoronto.ca',
                        'zhangchuyue.zhang@mail.utoronto.ca',
                        'leo.hanxu@mail.utoronto.ca'];

    window.location.href = `mailto:${receivers.join(',')}
                            ?subject=${subject}
                            &body=${`From: ${sender}\n\n${messages}`}`;
}