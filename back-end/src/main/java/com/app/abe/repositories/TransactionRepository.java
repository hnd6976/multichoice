package com.app.abe.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.abe.models.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction,String>{
	@Query("SELECT t FROM Transaction t WHERE t.user.id=?1")
	Page<Transaction> findByUserId(Long id,Pageable paging);
	@Query("SELECT t FROM Transaction t WHERE t.document.id=?1")
	Page<Transaction> findByDocumentId(Integer id,Pageable paging);
	@Query("SELECT t FROM Transaction t WHERE t.document.id=?1")
	List<Transaction> findByDocumentId(Integer id);
	@Query("SELECT DISTINCT YEAR(created_at) FROM Transaction ORDER BY YEAR(created_at)")
	List<Integer> getListYear();
	@Query("SELECT DISTINCT MONTH(created_at) FROM Transaction WHERE YEAR(created_at)=?1 ORDER BY MONTH(created_at)")
	List<Integer> getListMonth(Integer year);
	@Query("SELECT DISTINCT DAY(created_at) FROM Transaction WHERE YEAR(created_at)=?1 AND MONTH(created_at)=?2 ORDER BY DAY(created_at)")
	List<Integer> getListDay(Integer year,Integer month);
	@Query("SELECT COUNT(*) FROM Transaction")
	Long getAllDownloadedCount();
	@Query("SELECT YEAR(created_at),COUNT(*) FROM Transaction GROUP BY YEAR(created_at)")
	List<Object> getDownloadedYear();
	@Query("SELECT MONTH(created_at),COUNT(*) FROM Transaction WHERE YEAR(created_at)=?1 GROUP BY MONTH(created_at)")
	List<Object> getDownloadedMonth(Integer year);
	@Query("SELECT DAY(created_at),COUNT(*) FROM Transaction WHERE YEAR(created_at)=?1 AND MONTH(created_at)=?2 GROUP BY DAY(created_at)")
	List<Object> getDownloadedDay(Integer year,Integer month);
	
	@Query("SELECT SUM(amount) FROM Transaction")
	Long getAllRevenueCount();
	@Query("SELECT YEAR(created_at),SUM(amount) FROM Transaction GROUP BY YEAR(created_at)")
	List<Object> getRevenueYear();
	@Query("SELECT MONTH(created_at),SUM(amount) FROM Transaction WHERE YEAR(created_at)=?1 GROUP BY MONTH(created_at)")
	List<Object> getRevenueMonth(Integer year);
	@Query("SELECT DAY(created_at),SUM(amount) FROM Transaction WHERE YEAR(created_at)=?1 AND MONTH(created_at)=?2 GROUP BY DAY(created_at)")
	List<Object> getRevenueDay(Integer year,Integer month);
	
	@Query("SELECT t.document.name, COUNT(*) FROM Transaction t GROUP BY t.document.name ORDER BY COUNT(*)  DESC LIMIT 5")
	List<Object> getTopDownloadedAll();
	@Query("SELECT t.document.name, COUNT(*) FROM Transaction t WHERE YEAR(created_at)=?1 GROUP BY t.document.name ORDER BY COUNT(*)  DESC LIMIT 5")
	List<Object> getTopDownloadedYear(Integer year);
	@Query("SELECT t.document.name, COUNT(*) FROM Transaction t WHERE YEAR(created_at)=?1 AND MONTH(created_at)=?2"
			+ " GROUP BY t.document.name ORDER BY COUNT(*)  DESC LIMIT 5")
	List<Object> getTopDownloadedMonth(Integer year,Integer month);
	@Query("SELECT t.document.name, COUNT(*) FROM Transaction t WHERE YEAR(created_at)=?1 AND MONTH(created_at)=?2 AND DAY(created_at)=?3"
			+ " GROUP BY t.document.name ORDER BY COUNT(*)  DESC LIMIT 5")
	List<Object> getTopDownloadedDay(Integer year,Integer month,Integer created_at);
	
	@Query("SELECT t.document.name, SUM(t.amount) FROM Transaction t GROUP BY t.document.name ORDER BY SUM(t.amount)  DESC LIMIT 5")
	List<Object> getTopRevenueAll();
	@Query("SELECT t.document.name, SUM(t.amount) FROM Transaction t WHERE YEAR(created_at)=?1 GROUP BY t.document.name ORDER BY SUM(t.amount)  DESC LIMIT 5")
	List<Object> getTopRevenueYear(Integer year);
	@Query("SELECT t.document.name, SUM(t.amount) FROM Transaction t WHERE YEAR(created_at)=?1 AND MONTH(created_at)=?2"
			+ " GROUP BY t.document.name ORDER BY SUM(t.amount)  DESC LIMIT 5")
	List<Object> getTopRevenueMonth(Integer year,Integer month);
	@Query("SELECT t.document.name, SUM(t.amount) FROM Transaction t WHERE YEAR(created_at)=?1 AND MONTH(created_at)=?2 AND DAY(created_at)=?3"
			+ " GROUP BY t.document.name ORDER BY SUM(t.amount)  DESC LIMIT 5")
	List<Object> getTopRevenueDay(Integer year,Integer month,Integer created_at);
}
