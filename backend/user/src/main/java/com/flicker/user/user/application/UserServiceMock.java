package com.flicker.user.user.application;

import com.flicker.user.common.exception.RestApiException;
import com.flicker.user.common.status.StatusCode;
import com.flicker.user.user.domain.UserConverter;
import com.flicker.user.user.domain.entity.User;
import com.flicker.user.user.dto.UserLoginReqDto;
import com.flicker.user.user.dto.UserLoginResDto;
import com.flicker.user.user.dto.UserRegisterDto;
import com.flicker.user.user.infrastructure.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceMock implements UserService{

    private final UserRepository userRepository;
    private final UserConverter userConverter;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserLoginResDto login(UserLoginReqDto dto) {

//        User findUser = userRepository.findByUserId(dto.getUserId());
//        if(findUser == null) {
//            throw new RestApiException(StatusCode.INVALID_ID_OR_PASSWORD);
//        }
//
//        if(findUser.getHashedPass().equals(HashUtil.sha256(dto.getPassword()))) {
//            // JWT 발급 처리
//            return userConverter.toUserLoginResDto(findUser);
//        }
//        throw new RestApiException(StatusCode.INVALID_ID_OR_PASSWORD);

        return null;
    }

    @Override
    @Transactional
    public boolean register(UserRegisterDto dto) {

        User findUser = userRepository.findByUserId(dto.getUserId());
        if(findUser != null) {
            throw new RestApiException(StatusCode.DUPLICATE_ID);
        }

        dto.setPassword(bCryptPasswordEncoder.encode(dto.getPassword()));
        User user = userConverter.registerDtoToUser(dto);
        System.out.println("저장 완료");
        userRepository.save(user);

        return false;
    }
}
