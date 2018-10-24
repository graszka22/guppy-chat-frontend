import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import './Messages.css';

const messages = [
    {
        content: "Hello world",
        user: "Aldebrand",
        avatar: "https://picsum.photos/100/100/?random",
    },
    {
        content: "Hello my love <3",
        user: "me",
    },
    {
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        user: "me",
    },
    {
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta gravida massa, a dignissim sem convallis quis. Nunc sit amet lacus vehicula, blandit lacus a, ullamcorper urna. Proin quis est vitae neque auctor dignissim non et ante. In non diam a libero interdum fringilla. Nunc ut vulputate felis. Vestibulum vehicula erat justo, ut venenatis sapien tincidunt sed. Morbi in fermentum libero. Nulla lobortis ante vel diam eleifend rhoncus. Morbi fringilla semper nibh, non posuere nibh maximus eu. Quisque lobortis turpis sed erat malesuada faucibus. Integer vehicula odio eget mauris suscipit vehicula. Donec euismod purus semper, laoreet tortor eget, bibendum tortor. Donec sed ultrices velit. Maecenas at molestie mauris, eget suscipit est.",
        user: "Aldebrand",
        avatar: "https://picsum.photos/100/100/?random",
    },
    {
        content: "<3",
        user: "me",
    },
    {
        content: "Cras porttitor, leo sed malesuada imperdiet, lorem diam venenatis dui, sit amet accumsan diam ante in nulla. Fusce erat diam, rutrum eget neque sit amet, suscipit pharetra arcu. Praesent elementum imperdiet commodo. Sed auctor libero sit amet mauris semper, condimentum finibus eros eleifend. Phasellus at tellus eget augue interdum volutpat ultrices laoreet erat. Praesent interdum nibh non aliquet efficitur. Pellentesque a nisl sed tortor venenatis fermentum. In vel libero nunc. Etiam molestie orci vitae mauris ultrices semper.",
        user: "Aldebrand",
        avatar: "https://picsum.photos/100/100/?random",
    }
]

class Messages extends Component {
    render() {
        return (
            <div className="Messages">
                {
                    messages.map(message => {
                            const type = message.user === "me" ? "me" : "other";
                            return (
                                <div className={`Message ${type}`}>
                                    <Image src={message.avatar} avatar className="Avatar" />
                                    <p className={`MessageText ${type}`}>{message.content}</p>
                                </div>
                            );
                        }
                    )
                }
            </div>
        );
    }
};

export default Messages;