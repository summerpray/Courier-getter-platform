DROP TABLE IF EXISTS `order`;

CREATE TABLE `order` (
  `orderid` int(11) NOT NULL AUTO_INCREMENT,
  `destination` varchar(100) NOT NULL,
  `ShelvesImformation` varchar(100) NOT NULL,
  `price` int(20) NOT NULL,
  `phone_numbers` varchar(100) NOT NULL,
  `tip` varchar(100) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`orderid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;