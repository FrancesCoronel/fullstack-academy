USE `twitterjs`;

TRUNCATE TABLE `Users`;

INSERT INTO `Users` (`id`, `name`, `pictureUrl`) VALUES (NULL, 'Zeke', 'http://www.fullstackacademy.com/img/team/zeke_nierenberg@2x_nerd.jpg');
INSERT INTO `Users` (`id`, `name`, `pictureUrl`) VALUES (NULL, 'Christain', 'http://www.fullstackacademy.com/img/team/christian_sakai@2x_nerd.jpg');
INSERT INTO `Users` (`id`, `name`, `pictureUrl`) VALUES (NULL, 'Tessa', 'http://www.fullstackacademy.com/img/team/tessa_siegel@2x_nerd.jpg');
INSERT INTO `Users` (`id`, `name`, `pictureUrl`) VALUES (NULL, 'Nimit', 'http://www.fullstackacademy.com/img/team/nimit_maru@2x_nerd.jpg');
INSERT INTO `Users` (`id`, `name`, `pictureUrl`) VALUES (NULL, 'David', 'http://www.fullstackacademy.com/img/team/david_yang@2x_nerd.jpg');
INSERT INTO `Users` (`id`, `name`, `pictureUrl`) VALUES (NULL, 'Fullstack', 'https://pbs.twimg.com/profile_images/378800000500453121/0f8ead5d3dbd4e3f747aaca6bf3b8d9a.png');
INSERT INTO `Users` (`id`, `name`, `pictureUrl`) VALUES (NULL, 'Class 111', 'http://1.bp.blogspot.com/-1aK7HDgQUXs/UJJRzSCvCRI/AAAAAAAABec/9YECGPST3rk/s1600/111.png');

TRUNCATE TABLE `Tweets`;

INSERT INTO `Tweets` (`id`, `userId`, `tweet`) VALUES (NULL, '1', 'Fullstack is great! #fsalove');
INSERT INTO `Tweets` (`id`, `userId`, `tweet`) VALUES (NULL, '2', 'Fullstack academy is amazing');
INSERT INTO `Tweets` (`id`, `userId`, `tweet`) VALUES (NULL, '3', 'Fullstack academy instructor is very cool');
INSERT INTO `Tweets` (`id`, `userId`, `tweet`) VALUES (NULL, '4', 'Zeke is mindblowing');
INSERT INTO `Tweets` (`id`, `userId`, `tweet`) VALUES (NULL, '5', 'Charlotte is amazing');
INSERT INTO `Tweets` (`id`, `userId`, `tweet`) VALUES (NULL, '6', 'bla bla bla');
INSERT INTO `Tweets` (`id`, `userId`, `tweet`) VALUES (NULL, '7', 'bla bla bla is so whatever');