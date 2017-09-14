$(function () {
    var conversationsTab = $('#conversations');
    var usersTab = $('#users');

    /**
     * show available channels
     */

    var requestedAddress = 'http://localhost:3000';
    (function () {
        var getConversations = function () {
            return $.get(`${requestedAddress}/conversations`, function (data) {
                if (!data.status) {
                    return false;
                }

                var conversations = data && data.conversations;

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

        var getUsers = function () {
            return $.get(`${requestedAddress}/users`, function (data) {
                if (!data.status) {
                    return false;
                }

                var users = data && data.users;

                users.forEach(function (user, index) {
                    var template = `
                    <div class="chat-user user" data-user="${user.name}" data-username="${user.username}">
                        <span class="pull-right label label-success">Online</span>
                        <img class="chat-avatar" src="images/a3.jpg" alt="">
                        <div class="chat-user-name">
                            <a href="#">${user.name}</a>
                        </div>
                    </div>
                    `;

                    usersTab.append(template);
                })
            })
        };

        getUsers();
        getConversations();
    })();

    /**
     * web socket
     */

    var socket = io('//localhost:3000');
    var currentChannel = undefined;
    var currentUser = undefined;

    /**
     * join channel when pressed
     */
    conversationsTab.on('click', '.channel', function (e) {
        var channelId = $(this).attr('data-channel');

        socket.emit('join channel', {
            channel: channelId
        });

        $('.chat-discussion').html('');

        e.preventDefault();
    });

    usersTab.on('click', '.user', function (e) {
        var user = $(this).attr('data-user');
        var username = $(this).attr('data-username');

        socket.emit('join user', {
            user,
            username
        });

        $('.chat-discussion').html('');

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

            if (!currentChannel) {
                socket.emit('message user', {
                    message: val,
                    username: currentUser,
                    sentAt: date
                });
            } else {
                socket.emit('message channel', {
                    message: val,
                    channel: currentChannel,
                    sentAt: date
                });
            }

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
     * received answer
     *
     *
     */

    socket.on('joined channel', function (data) {
        currentChannel = data.channel;
    });

    socket.on('joined user', function (data) {
        currentUser = data.user;
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