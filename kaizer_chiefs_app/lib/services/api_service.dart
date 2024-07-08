import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/comment.dart';

class ApiService {
  final String baseUrl = 'https://assesmentapi-production.up.railway.app/api';
  Future<List<Comment>> fetchComments() async {
    final response = await http.get(Uri.parse('$baseUrl/comments'));

    if (response.statusCode == 200) {
      List jsonResponse = json.decode(response.body);

      Map<int, List<Reply>> repliesMap = {};
      List<Comment> commentsList = [];

      for (var item in jsonResponse) {
        int commentId = item['id'];
        Reply reply = Reply.fromJson(item);

        if (!repliesMap.containsKey(commentId)) {
          repliesMap[commentId] = [];
        }
        repliesMap[commentId]!.add(reply);
      }

      repliesMap.forEach((id, replies) {
        var first = jsonResponse.firstWhere((item) => item['id'] == id);
        commentsList.add(Comment(
          id: id,
          name: first['name'] ?? 'Unknown',
          content: first['comment'] ?? '',
          createdAt:
              DateTime.parse(first['created_at'] ?? '1970-01-01T00:00:00Z'),
          replies: replies,
        ));
      });

      return commentsList;
    } else {
      throw Exception('Failed to load comments');
    }
  }

  Future<void> addComment(String name, String content) async {
    final response = await http.post(
      Uri.parse('$baseUrl/comments'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'name': name,
        'comment': content,
      }),
    );

    if (response.statusCode != 201) {
      throw Exception('Failed to add comment');
    }
  }

  Future<void> addReply(int commentId, String fanName, String fanReply) async {
    final response = await http.post(
      Uri.parse('$baseUrl/comments/$commentId/reply'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'fan_name': fanName,
        'fan_reply': fanReply,
      }),
    );

    if (response.statusCode != 201) {
      throw Exception('Failed to add reply');
    }
  }
}
