package com.app.abe.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.app.abe.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUsername(String username);
	Optional<User> findById(Long id);
	Boolean existsByUsername(String username);
	Boolean existsByEmail(String email);
   // User getUserByEmailAndUsername(String email,String name);
	Optional<User> findByEmail(String email);
	@Query("SELECT u FROM User u WHERE u.username LIKE %?1% OR u.email LIKE %?1%")
	Page<User> findAll(String key,Pageable paging);
	@Query("SELECT COUNT(*) FROM User ")
	Long getCountAll();
	@Query("SELECT COUNT(*) FROM User u WHERE u.sta=true AND u.isEnabled=true ")
	Long getCountActive();
	@Query("SELECT YEAR(created_at),COUNT(*) FROM User u GROUP BY YEAR(created_at) ")
	List<Object> getCountCreatedEachYear();
	@Query("SELECT MONTH(created_at),COUNT(*) FROM User u WHERE YEAR(created_at)=?1  GROUP BY MONTH(created_at) ")
	List<Object> getCountCreatedEachMonth(Integer year);
	@Query("SELECT DAY(created_at),COUNT(*) FROM User u WHERE YEAR(created_at)=?1 AND MONTH(created_at)=?2  GROUP BY DAY(created_at) ")
	List<Object> getCountCreatedEachDay(Integer year,Integer month);
	
	@Query("SELECT DISTINCT YEAR(created_at) FROM User ORDER BY YEAR(created_at)")
	List<Integer> getListYear();
	@Query("SELECT DISTINCT MONTH(created_at) FROM User WHERE YEAR(created_at)=?1 ORDER BY MONTH(created_at)")
	List<Integer> getListMonth(Integer year);
	@Query("SELECT DISTINCT DAY(created_at) FROM User WHERE YEAR(created_at)=?1 AND MONTH(created_at)=?2 ORDER BY DAY(created_at)")
	List<Integer> getListDay(Integer year,Integer month);
	
}
