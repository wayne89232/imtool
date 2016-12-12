-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 12, 2016 at 07:50 AM
-- Server version: 5.6.28
-- PHP Version: 7.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `imtool`
--

--
-- Dumping data for table `mission`
--

INSERT INTO `mission` (`mission_id`, `user_id`, `location_id`, `title`, `content`, `recruit_time`, `start_time`, `expire_time`, `state`, `createdAt`, `updatedAt`) VALUES
('1', '19dddecfa2176953057f16f63ba3d52f', NULL, 'Bike', 'Bike', NULL, NULL, NULL, 'Recruiting', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('2', 'e59bf7cd0b41e35b7ba50fc8e71cdf64', NULL, 'Test', 'test', NULL, NULL, NULL, 'Recruiting', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('3', 'cdf02830e6eba153d68595d64f5d397a', NULL, '徵女一舍到管院單程前往車夫一名 ><', '徵女一舍到管院單程前往車夫一名 ><', NULL, NULL, NULL, 'Recruiting', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

--
-- Dumping data for table `mission_skill`
--

INSERT INTO `mission_skill` (`mission_skill_id`, `skill_id`, `mission_id`, `createdAt`, `updatedAt`) VALUES
('1', '1', '3', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('2', '2', '3', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

--
-- Dumping data for table `skill`
--

INSERT INTO `skill` (`skill_id`, `skill`, `createdAt`, `updatedAt`) VALUES
('1', 'Bike', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('2', 'handsome', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

--
-- Dumping data for table `toolship`
--

INSERT INTO `toolship` (`toolship_id`, `user_id`, `mission_id`, `rating`, `feedback`, `createdAt`, `updatedAt`) VALUES
('1', '7a14025d87f837aedb17c502b3231b49', '1', NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('2', '6399cc0b0a477dc1e4d9bcc43f652e29', '1', NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('3', '19dddecfa2176953057f16f63ba3d52f', '2', NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('4', '6399cc0b0a477dc1e4d9bcc43f652e29', '3', NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `account`, `password`, `gender`, `photo_url`, `user_name`, `email`, `createdAt`, `updatedAt`) VALUES
('19dddecfa2176953057f16f63ba3d52f', 'wei', 'wei', 'B', '/assets/images/tool.png', 'wei', 'wei', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('6399cc0b0a477dc1e4d9bcc43f652e29', 'pu', 'pu', 'B', '/assets/images/tool.png', 'pu', 'pu', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('7a14025d87f837aedb17c502b3231b49', 'rick', 'rick', 'B', '/assets/images/tool.png', 'rick', 'rick', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('cdf02830e6eba153d68595d64f5d397a', 'E', 'E', 'G', '/assets/images/ee.jpg', 'EE', 'EE', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('e59bf7cd0b41e35b7ba50fc8e71cdf64', 'J', 'J', 'B', '/assets/images/tool.png', 'J', 'J', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

--
-- Dumping data for table `user_skill`
--

INSERT INTO `user_skill` (`user_skill_id`, `skill_id`, `user_id`, `createdAt`, `updatedAt`) VALUES
('1', '1', '19dddecfa2176953057f16f63ba3d52f', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
