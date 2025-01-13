<script setup>
import {onMounted, ref} from 'vue'
import Logo from "@/components/UI/Logo.vue";
import StandardButton from "@/components/UI/StandardButton.vue";
import InputField from "@/components/UI/InputField.vue";
import {API_URL} from "@/config.js";
import {getUser} from "@/scripts/getUser";


const loading = ref(true)
const friends = ref([])
const friendRequests = ref([])
const addFriendEmail = ref('')
const user = getUser()

const getFriends = async () => {
  loading.value = true
  try {
    const response = await fetch(`${API_URL}/GetFriends?userId=${user.id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch friends')
    }
    friends.value = await response.json()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const getFriendRequests = async () => {
  loading.value = true
  try {
    const response = await fetch(`${API_URL}/GetFriendRequests?userId=${user.id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch friend requests')
    }
    friendRequests.value = await response.json()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const AddFriend = async () => {
  loading.value = true
  try {
    const response = await fetch(`${API_URL}/AddFriend?userId=${user.id}&email=${addFriendEmail.value}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if (!response.ok) {
      throw new Error('Failed to add friend')
    }
    addFriendEmail.value = ''
    await getFriends()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const AcceptFriendRequest = async (friendId) => {
  loading.value = true
  try {
    const response = await fetch(`${API_URL}/AcceptFriend?friendId=${friendId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if (!response.ok) {
      throw new Error('Failed to accept friend request')
    }
    await getFriends()
    await getFriendRequests()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const DenyFriendRequest = async (friendId) => {
  loading.value = true
  try {
    const response = await fetch(`${API_URL}/DenyFriend?friendId=${friendId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if (!response.ok) {
      throw new Error('Failed to deny friend request')
    }
    await getFriendRequests()
    await getFriends()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const RemoveFriend = async (friendId) => {
  loading.value = true;
  try {
    const response = await fetch(`${API_URL}/RemoveFriend?userId=${user.id}&friendId=${friendId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (!response.ok) {
      throw new Error('Failed to remove friend');
    }
    await getFriends();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getFriends()
  getFriendRequests()
})
</script>

<template>
<div class="window">
  <Logo :loading="loading"/>

  <div class="add-friend-container">
    <div class="add-friend-title">
      <h1>Add friend</h1>
    </div>
    <form @submit.prevent="AddFriend" class="add-friend-form">
      <InputField v-model="addFriendEmail" :label="true" :label-text="'Email:'"/>
      <StandardButton :type="'positive'" :content="'Add friend'"></StandardButton>
    </form>
  </div>

  <div class="friend-requests-container">
    <div class="friend-requests-title">
      <h1>Friend requests</h1>
    </div>
    <div class="friend-requests-list">
      <div v-for="request in friendRequests" :key="request.name" class="friend-request">
        <p>{{request.name}}</p>
        <StandardButton :type="'positive'" :content="'Accept'" :action="() => AcceptFriendRequest(request.id)"></StandardButton>
        <StandardButton :type="'negative'" :content="'Decline'" :action="() => DenyFriendRequest(request.id)"></StandardButton>
      </div>
    </div>
  </div>

  <div class="friend-list-container">
      <div class="friends-title">
        <h1>Friends</h1>
      </div>
    <div class="friends-list">
      <div v-for="friend in friends" :key="friend.name" class="friend">
        <p>{{friend.name}}</p>
        <p>{{friend.email}}</p>
        <StandardButton :type="'negative'" :content="'Remove'" :action="() => RemoveFriend(friend.id)"></StandardButton>
      </div>
    </div>
  </div>

</div>
</template>

<style scoped lang="scss">
.window {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  color: var(--Text-color);
  font-weight: 800;
  height: 100vh;
}

.add-friend-container, .friend-requests-container, .friend-list-container {
  width: 75%;
  max-width: 22.5rem;
  margin-bottom: 1.25rem;
}

.add-friend-title, .friend-requests-title, .friends-title {
  text-align: center;
  margin-bottom: 0.625rem;
}

.add-friend-form, .friend-requests-list, .friends-list {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.friend-request, .friend {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem;
  border: 1px solid var(--Border-color);
  border-radius: 0.25rem;
  background-color: var(--Background-color);
}

.friend-request p, .friend p {
  margin: 10px;
}
</style>