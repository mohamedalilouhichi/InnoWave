package tn.esprit.backend.Service.Forum;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Post;
import tn.esprit.backend.Entite.PostLike;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.PostLikeRepo;
import tn.esprit.backend.Repository.PostRepo;
import tn.esprit.backend.Repository.UserRepo;
import java.util.List;


@Service

public class PostLikeService implements IPostLikeService {
    private  final PostLikeRepo postLikeRepository;
    private   final PostRepo postRepository;
    private  final UserRepo userRepository;


    @Autowired
    public PostLikeService(PostLikeRepo postLikeRepository, PostRepo postRepository, UserRepo userRepository) {
        this.postLikeRepository = postLikeRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }
    @Override
    public List<PostLike> addLikeToPostAndUser(long idPost, long idUser) {
        Post post = postRepository.findById(idPost)
                .orElseThrow(() -> new RuntimeException("Post not found for id: " + idPost));

        User user = userRepository.findById(idUser)
                .orElseThrow(() -> new RuntimeException("User not found for id: " + idUser));

        PostLike existingLikes = postLikeRepository.findByPostAndUser(post,user);
        PostLike postlike = new PostLike();
        if (existingLikes == null) {
            postlike.setUser(user);
            postlike.setPost(post);
            int nb =0 ;
            if(postLikeRepository.findByPost(post) != null)
            {
                List<PostLike> postLikes = postLikeRepository.findByPost(post);
                for (PostLike pslike: postLikes
                     ) {
                    nb=pslike.getNbrlike();
                    pslike.setNbrlike(pslike.getNbrlike()+1);

                    postLikeRepository.save(pslike);
                }
            }else{
                postlike.setNbrlike(postlike.getNbrlike() + 1);
            }
            postlike.setNbrlike(nb+1);
            postlike.setDislike(true);
             postLikeRepository.save(postlike);
        } else {
            if (existingLikes.getDislike() == true) {
                  //  postLikeRepository.decrementLikesById(postLikeRepository.findByPost(post).getIdLike());
                List<PostLike> postLikes = postLikeRepository.findByPost(post);
                for (PostLike pslike: postLikes
                ) {
                    pslike.setNbrlike(pslike.getNbrlike()-1);
                    postLikeRepository.save(pslike);
                }
                existingLikes.setDislike(false);
                 postLikeRepository.save(existingLikes);
            } else {
                List<PostLike> postLikes = postLikeRepository.findByPost(post);
                for (PostLike pslike: postLikes
                ) {
                    pslike.setNbrlike(pslike.getNbrlike()+1);
                    postLikeRepository.save(pslike);
                }
                existingLikes.setDislike(true);
                //postLikeRepository.incrementLikesById(existingLikes.getIdLike());
                postLikeRepository.save(existingLikes);
            }
        }
    return null ;
    }
}
