package tn.esprit.backend.Service.Forum;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.backend.Entite.Image;
import tn.esprit.backend.Entite.Post;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.ImageRepo;
import tn.esprit.backend.Repository.PostLikeRepo;
import tn.esprit.backend.Repository.PostRepo;
import tn.esprit.backend.Repository.UserRepo;
import java.io.IOException;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PostService implements IPostService {
    PostRepo postRepo;
    UserRepo userRepo ;
    PostLikeRepo postLikeRepo ;
    BadWordFilterService badWordFilterService ;
    private  final ImageRepo imageRepository ;

    @Override
    public List<Post> retrieveAllPosts() {
        return postRepo.findAll();
    }

    // retrievpost by idpost pour le telechargement de l'image
    @Override
    public Post getPostbyid(Long idPost) {

        return postRepo.findById(idPost).orElse(null);
    }



    public Post addPostToUser(Post post, Long idUser, String title, String description, LocalDate creationdate, MultipartFile file, String images) throws IOException {
        try {
            if (badWordFilterService.containsBadWord(title) || badWordFilterService.containsBadWord(description)) {
                throw new IllegalArgumentException("Post contain inappropriate content or contains a subject that should not be posted here. Please review your post before submitting.");
            }

            post.setTitle(title);
            post.setDescription(description);
            post.setCreationdate(creationdate);
            Set<Image> list = new  HashSet<>();
            String[] idArray = images.split("\\s+");

            // Convert each number string to its corresponding integer value
            List<Long> idList = Arrays.stream(idArray)
                    .map(Long::valueOf)
                    .collect(Collectors.toList());

            for (long myid : idList
                 ) {list.add( imageRepository.findById((int) myid).get());

            }
            post.setImages(list);
            if (file != null && !file.isEmpty()) {
                post.setFile(file.getBytes());
            }

            User user = userRepo.findById(idUser).orElse(null);
            post.setUser(user);

            return postRepo.save(post);
        } catch (IOException e) {
            // Handle IOException (e.g., log the error or throw a custom exception)
            throw new RuntimeException("Error processing file: " + e.getMessage(), e);
        } catch (Exception e) {
            // Handle other exceptions (e.g., database-related issues)
            throw new RuntimeException("Error adding post: " + e.getMessage(), e);
        }
    }



    @Override
    public void removePost(Long idPost) {

        postRepo.deleteById(idPost);
    }


    @Override
    public Post modifyPost(Long idPost, String title , String description, String images, MultipartFile file) throws IOException {
        Post post = postRepo.findById(idPost)
                .orElseThrow(() -> new RuntimeException("Post not found for this id :: " + idPost));

        // Update post fields
        post.setTitle(title);
        post.setDescription(description);
        //set images
        Set<Image> list=post.getImages();
        saveimages(list,post);
        // Update file if provided
        if (file != null && !file.isEmpty()) {
            post.setFile(file.getBytes());
        }


        return postRepo.save(post);
    }




    @Override
    public List<Post> retrievePostByIdUser(Long idUser) {
        List<Post> posts = postRepo.findPostsByUser_IdUser(idUser);

        if (posts != null && !posts.isEmpty()) {
            return posts;
        } else {
            // If no posts are found, you can return an empty list or handle it based on your requirements.
            return Collections.emptyList();
        }
    }
    @Override
    public Post findMostLikedPost() {
        //       List<Object[]> result = postRepo.findMostLikedPostWithTotalLikes(PageRequest.of(0, 1));
//
//        if (!result.isEmpty()) {
//            Object[] data = result.get(0);
//            return (Post) data[0];
//        } else {
//            return null; // Handle the case when there are no posts
//        }
        return null;
    }

    @Override
    public List<Post> postuser(long id) {
        List<Post> allPosts = postRepo.findAll();
        return allPosts.stream()
                .filter(post -> post.getUser().getIdUser() == id)
                .collect(Collectors.toList());
    }
    @Override
    public void removeImageIdFromPost(int id) {
        Optional<Post> eventOptional = postRepo.findByImages_Id(id);

        if (eventOptional.isPresent()) {
            Post post = eventOptional.get();

            // Remove the image with the specified id from the images set
            post.getImages().removeIf(image -> image.getId() == id);

            // Save the updated event back to the repository
            postRepo.save(post);
        }
    }
    public Post saveimages(Set<Image> list, Post post){
        Set<Image> list2=new HashSet<>();
        System.out.println(post.getIdPost());
        list.forEach(a->{
            if (a.getIdPost()!=post.getIdPost()){
                a.setIdPost((int) post.getIdPost());
                imageRepository.save(a);
                list2.add(a);
                System.out.println("image 1");
            }else {
                System.out.println("Image 2");
                list2.add(a);
            }

        });
        System.out.println(post.getIdPost()+"UPDATING");

        post.setImages(list2);
        postRepo.save(post);
        return post;
    }
}