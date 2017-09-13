$(function () {
    var conversationsTab = $('#conversations');

    /**
     * show available channels
     */
    (function () {
        var getConversations = function () {
            return $.get('http://localhost:3000/conversations', function (data) {
                if (!data.status) {
                    return false;
                }

                var conversations = data && data.conversations

                conversations.forEach(function (conversation, index) {
                    var template = `
                    <div class="chat-user channel" data-channel="${conversation._id}">
                        <span class="pull-right label label-success">Online</span>
                        <img class="chat-avatar" src="images/a3.jpg" alt="">
                        <div class="chat-user-name">
                            <a href="#">${conversation.name}</a>
                        </div>
                    </div>
                    `;

                    conversationsTab.append(template);
                });
            })
        };

        getConversations();
    })();

    /**
     * web socket
     */

    var socket = io('//localhost:3000');
    var currentChannel = undefined;

    /**
     * join channel when pressed
     */
    conversationsTab.on('click', '.channel', function (e) {
        var channelId = $(this).attr('data-channel');

        socket.emit('join channel', {
            channel: channelId
        });

        e.preventDefault();
    });

    /**
     * send message
     */

    $('#message').on('keypress', function (e) {
        if (e.which === 13 || e.keyCode === 13) {
            var message = $('#message');
            var val = message.val();
            message.val('');

            if (!message) {
                return;
            }

            var date = new Date();

            socket.emit('message channel', {
                message: val,
                channel: currentChannel,
                sentAt: date
            });

            var msgTpl = `
            <div class="chat-message right">
                <img class="message-avatar" src="images/a2.jpg" alt="">
                <div class="message">
                    <a class="message-author" href="#"> Michael Smith </a>
                    <span class="message-date">  ${formatDate(date)} </span>
                    <span class="message-content">
                    ${val}
                    </span>
                </div>
            </div>
            `;

            $('.chat-discussion').append(msgTpl);

            e.preventDefault();
        }
    });

    /**
     *
     *
     *
     * received answer
     *
     *
     */

    socket.on('joined channel', function (data) {
        currentChannel = data.channel;
    });

    /**
     * receive and insert message
     */

    socket.on('new message', function (data) {
        if (!data.message) {
            return;
        }

        var date = new Date(data.sentAt);
        var msgTpl = `
        <div class="chat-message right">
            <img class="message-avatar" src="images/a2.jpg" alt="">
            <div class="message">
                <a class="message-author" href="#"> Michael Smith </a>
                <span class="message-date">  ${formatDate(date)} </span>
                <span class="message-content">
                ${data.message}
                </span>
            </div>
        </div>
        `;
        $('.chat-discussion').append(msgTpl);
    });
});

function formatDate(date) {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var dayNames = [
        "Sunday", "Monday", "Tuesday",
        "Wednesday", "Thursday", "Friday",
        "Saturday"
    ]

    var day = date.getDate();
    var dayIndex = date.getDay();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    return dayNames[dayIndex] + ' ' + monthNames[monthIndex] + ' ' + day + ' ' + year + ' - ' + hour + ':' + minutes + ':' + seconds;
}