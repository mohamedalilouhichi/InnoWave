package tn.esprit.backend.Service.Forum;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.esprit.backend.Entite.Image;
import tn.esprit.backend.Repository.ImageRepo;
import tn.esprit.backend.Repository.PostRepo;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ImageService {
    @Autowired
    ImageRepo imageRepository ;
    @Autowired
    PostRepo postRepo ;
    public List<Image> list()
    {
        return imageRepository.findAll();
    }
    public List<Image> list(int idPost)
    {
        return postRepo.findById(Long.valueOf(idPost)).get().getImages().stream().toList();
        //   return imageRepository.findImagesByIdPost(idPost);
    }

    public Optional<Image> getOne(int id){return imageRepository.findById(id);}
    public void save(Image image){imageRepository.save(image);}

    public void delete(int id){imageRepository.deleteById(id);}
    public boolean exists(int id){return imageRepository.existsById(id);}
}
