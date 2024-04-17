package tn.esprit.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.FavorisPlan;

import java.util.Optional;

@Repository
public interface FavorisRepo  extends JpaRepository<FavorisPlan, Long> {

    boolean existsByIdUserAndIdPlanning(Long idUser, Long idPlanning);

    Optional<FavorisPlan> findByIdUserAndIdPlanning(Long idUser, Long idPlanning);
}
