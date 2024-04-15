package tn.esprit.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.FavorisPlan;

@Repository
public interface FavorisRepo  extends JpaRepository<FavorisPlan, Long> {

}
