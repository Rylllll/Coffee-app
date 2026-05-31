import { Heart, MessageCircle, Send } from "lucide-react-native";
import { useState } from "react";
import { Image, Pressable, TextInput, View } from "react-native";
import { BrewText } from "@/components/ui/BrewText";
import { EmptyState } from "@/components/ui/EmptyState";
import { GlassCard } from "@/components/ui/GlassCard";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useBrewStore } from "@/src/stores/useBrewStore";

export default function SocialScreen() {
  const posts = useBrewStore((state) => state.socialPosts);
  const togglePostLike = useBrewStore((state) => state.togglePostLike);
  const addComment = useBrewStore((state) => state.addComment);
  const [commentText, setCommentText] = useState<Record<string, string>>({});

  return (
    <Screen>
      <View className="gap-2">
        <BrewText variant="caption">Coffee social feed</BrewText>
        <BrewText variant="hero">Minimal feed</BrewText>
      </View>
      <SectionHeader eyebrow="Community" title="Friends are drinking" />
      <View className="gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <GlassCard key={post.id} contentClassName="p-0">
              <View className="gap-4 p-4">
                <View className="flex-row items-center justify-between">
                  <View>
                    <BrewText className="font-semibold">
                      {post.authorName}
                    </BrewText>
                    <BrewText className="text-sm">
                      {post.coffeeName} - {post.cafeName}
                    </BrewText>
                  </View>
                  <BrewText className="font-semibold text-orange">
                    {post.rating}/10
                  </BrewText>
                </View>
              </View>
              <Image
                source={{ uri: post.photoUri }}
                className="h-72 w-full bg-latte"
              />
              <View className="gap-4 p-4">
                <BrewText>{post.caption}</BrewText>
                <View className="flex-row items-center gap-4">
                  <Pressable
                    onPress={() => togglePostLike(post.id)}
                    className="flex-row items-center gap-2"
                  >
                    <Heart
                      size={20}
                      color="#C96B38"
                      fill={post.likedByMe ? "#C96B38" : "transparent"}
                    />
                    <BrewText>{post.likes}</BrewText>
                  </Pressable>
                  <View className="flex-row items-center gap-2">
                    <MessageCircle size={20} color="#7C9A78" />
                    <BrewText>{post.comments.length}</BrewText>
                  </View>
                </View>
                {post.comments.map((comment) => (
                  <BrewText key={comment.id} className="text-sm">
                    {comment.author}: {comment.text}
                  </BrewText>
                ))}
                <View className="flex-row items-center gap-2">
                  <TextInput
                    value={commentText[post.id] ?? ""}
                    onChangeText={(text) =>
                      setCommentText((current) => ({
                        ...current,
                        [post.id]: text,
                      }))
                    }
                    placeholder="Add a comment"
                    placeholderTextColor="#8F7868"
                    className="min-h-12 flex-1 rounded-full border border-white/70 bg-white/75 px-5 text-espresso dark:border-white/10 dark:bg-white/10 dark:text-crema"
                  />
                  <Pressable
                    onPress={() => {
                      const text = commentText[post.id]?.trim();
                      if (!text) return;
                      addComment(post.id, text);
                      setCommentText((current) => ({
                        ...current,
                        [post.id]: "",
                      }));
                    }}
                    className="h-12 w-12 items-center justify-center rounded-full bg-espresso dark:bg-crema"
                  >
                    <Send size={18} color="#C96B38" />
                  </Pressable>
                </View>
              </View>
            </GlassCard>
          ))
        ) : (
          <EmptyState
            title="No posts yet"
            body="Coffee cards from people you follow will appear here."
          />
        )}
      </View>
    </Screen>
  );
}
