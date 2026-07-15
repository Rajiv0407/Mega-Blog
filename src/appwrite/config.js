import {Client,ID,Databases,Storage,Query} from 'appwrite';
import conf from '../conf/conf.js';


export class Service{

    client= new Client();
    databases;
    bucket;

    constructor(){
        this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId);
                this.databases= new Databases(this.client);
                this.bucket= new Storage(this.client);
    }
    async createPost({title,slug,content,image,status,userId}){
         try {
            await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionID,
                 slug,
                 {
                    title,
                    content,
                    image,
                    status,
                    userId,
                 }
            )
         } catch (error) {
            
         }
    }
    async updatePost(slug,{title,content,image,status}){
        try {
            await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionID,
                 slug,
                 {
                    title,
                    content,
                    image,
                    status,
                 }
                
                )
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){

        try {
             await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionID,
                slug
             )
             return true;
        } catch (error) {
            throw error;
        }
        

    }
    async getPost(slug){
        try {
          return  await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionID,
                slug)
        } catch (error) {
            throw error;
        }
    }

    async allPost(queries= [Query.equal('status','active')]){
        try {
            await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionID,
                queries)
        } catch (error) {
            console.log("Appwrite serice :: allPost :: error",error);
            
        }                     
    }
    async uploadFile(file){
        try {

            return await this.bucket.createFile(conf.appwriteBucketId,
                ID.unique(),
                file
            )
            
        } catch (error) {
            throw error
        }

    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
            
        } catch (error) {
            
        }

    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const service=new Service();
export default service;