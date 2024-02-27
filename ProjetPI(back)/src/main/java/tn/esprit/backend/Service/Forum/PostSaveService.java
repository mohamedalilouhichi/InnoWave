package tn.esprit.backend.Service.Forum;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Post;
import tn.esprit.backend.Entite.PostSave;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.PostRepo;
import tn.esprit.backend.Repository.PostSaveRepo;
import tn.esprit.backend.Repository.UserRepo;

import java.util.List;

@Service

public class PostSaveService implements IPostSaveService {
    private  final PostSaveRepo postSaveRepository;
    private   final PostRepo postRepository;
    private  final UserRepo userRepository;


    @Autowired
    public PostSaveService(PostSaveRepo postSaveRepository, PostRepo postRepository, UserRepo userRepository) {
        this.postSaveRepository = postSaveRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }


    @Override
    public List<PostSave> addSaveToPostAndUser(long idPost, long idUser) {
        Post post = postRepository.findById(idPost)
                .orElseThrow(() -> new RuntimeException("Post not found for id: " + idPost));

        User user = userRepository.findById(idUser)
                .orElseThrow(() -> new RuntimeException("User not found for id: " + idUser));

        PostSave existingSaves = postSaveRepository.findByPostAndUser(post,user);
        PostSave postsave = new PostSave();
        if (existingSaves == null) {
            postsave.setUser(user);
            postsave.setPost(post);
            int nb =0 ;
            if(postSaveRepository.findByPost(post) != null)
            {
                List<PostSave> postSaves = postSaveRepository.findByPost(post);
                for (PostSave pssave: postSaves
                ) {
                    nb=pssave.getNbrSave();
                    pssave.setNbrSave(pssave.getNbrSave()+1);

                    postSaveRepository.save(pssave);
                }
            }else{
                postsave.setNbrSave(postsave.getNbrSave() + 1);
            }
            postsave.setNbrSave(nb+1);
            postsave.setDisSave(true);
            postSaveRepository.save(postsave);
        } else {
            if (existingSaves.getdisSave() == true) {
                //  postSaveRepository.decrementSavesById(postSaveRepository.findByPost(post).getIdSave());
             //   List<PostSave> postSaves = postSaveRepository.findByPost(post);
               // for (PostSave pssave: postSaves
                //) {
                  //  pssave.setNbrSave(pssave.getNbrSave()-1);
                    //postSaveRepository.save(pssave);
                //}
                existingSaves.setDisSave(false);
                //postSaveRepository.save(existingSaves);
                postSaveRepository.delete(existingSaves);

            } else {
                List<PostSave> postSaves = postSaveRepository.findByPost(post);
                for (PostSave pssave: postSaves
                ) {
                    pssave.setNbrSave(pssave.getNbrSave()+1);
                    postSaveRepository.save(pssave);
                }
                existingSaves.setDisSave(true);
                //postSaveRepository.incrementSavesById(existingSaves.getIdSave());
                postSaveRepository.save(existingSaves);
            }
        }
        return null ;
    }
}
